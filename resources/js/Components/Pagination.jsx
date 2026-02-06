import { Link } from '@inertiajs/react';

export default function Pagination({ links, from, to, total }) {

    return (
        <div className="flex justify-between items-center mt-4 text-xs font-semibold">
            <div className="text-gray-500 pl-4">
                <span className="font-medium text-gray-700">{from} - {to}</span> of {total} records
            </div>

            <div className="flex">
                {links.map((link, key) => {
                    const isPrevious = link.label.includes('Previous') || link.label.includes('&laquo;');
                    const isNext = link.label.includes('Next') || link.label.includes('&raquo;');

                    let className = "flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md hover:bg-cyan-600 hover:text-white cursor-pointer";

                    if (link.active) {
                        className = "flex items-center justify-center px-4 py-2 mx-1 text-white bg-cyan-600 rounded-md";
                    } else if (link.url === null) {
                        className = "flex items-center justify-center px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md cursor-not-allowed rtl:-scale-x-100";
                    }

                    let content = <span dangerouslySetInnerHTML={{ __html: link.label }}></span>;

                    if (isPrevious) {
                        content = (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        );
                    } else if (isNext) {
                        content = (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        );
                    }

                    if (link.url === null) {
                        return (
                            <div key={key} className={className}>
                                {content}
                            </div>
                        );
                    }

                    return (
                        <Link key={key} href={link.url} className={className}>
                            {content}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
