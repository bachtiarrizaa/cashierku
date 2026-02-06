export const formatDate = (dateString) => {
    if (!dateString) return '-';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return '-';

    const day = String(date.getDate()).padStart(2, '0');
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
        'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
};
