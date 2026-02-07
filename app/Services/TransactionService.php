<?php

namespace App\Services;

use App\Models\Voucher;
use Carbon\Carbon;

class TransactionService
{
    /**
     * Hitung diskon per item berdasarkan asuransi dan voucher yang aktif.
     * Satu tindakan hanya pakai satu voucher (voucher pertama yang match).
     *
     * @param string|null $insuranceId
     * @param array $items [['procedure_id' => uuid, 'price' => int], ...]
     * @return array ['items' => [...], 'total_amount' => int, 'total_discount' => int, 'final_amount' => int]
     */
    public function calculateDiscount(?string $insuranceId, array $items): array
    {
        $today = Carbon::today()->format('Y-m-d');
        $totalAmount = 0;
        $totalDiscount = 0;

        $vouchers = [];
        if ($insuranceId) {
            $vouchers = Voucher::with('procedures')
                ->where('insurance_id', $insuranceId)
                ->where('is_active', true)
                ->whereDate('start_date', '<=', $today)
                ->whereDate('end_date', '>=', $today)
                ->orderBy('id')
                ->get();
        }

        $resultItems = [];
        foreach ($items as $item) {
            $procedureId = $item['procedure_id'];
            $price = (int) $item['price'];
            $totalAmount += $price;

            $discount = 0;
            $voucherId = null;
            $voucherType = null;
            $voucherValue = null;

            foreach ($vouchers as $voucher) {
                $procedureIds = $voucher->procedures->pluck('id')->toArray();
                if (!in_array($procedureId, $procedureIds)) {
                    continue;
                }

                if ($voucher->type === 'percentage') {
                    $discountValue = (int) floor($price * $voucher->value / 100);
                    if ($voucher->max_discount !== null && $voucher->max_discount > 0) {
                        $discountValue = min($discountValue, $voucher->max_discount);
                    }
                    $discount = $discountValue;
                    $voucherType = 'percentage';
                    $voucherValue = (int) $voucher->value;
                } else {
                    $discount = min($voucher->value, $price);
                    $voucherType = 'fixed';
                    $voucherValue = (int) $voucher->value;
                }

                $voucherId = $voucher->id;
                break;
            }

            $finalPrice = $price - $discount;
            $totalDiscount += $discount;

            $resultItems[] = [
                'procedure_id' => $procedureId,
                'price' => $price,
                'discount' => $discount,
                'final_price' => $finalPrice,
                'voucher_id' => $voucherId,
                'voucher_type' => $voucherType,
                'voucher_value' => $voucherValue,
            ];
        }

        return [
            'items' => $resultItems,
            'total_amount' => $totalAmount,
            'total_discount' => $totalDiscount,
            'final_amount' => $totalAmount - $totalDiscount,
        ];
    }
}
