import React from "react";
import { Link } from "@inertiajs/react";

const Websites = ({websites}) => {

    const handleEdit = () => {
        // do something 
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Template 
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Published
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {websites.length > 0 ? (
                        websites.map((item) => (
                            <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                key={item.id}
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    <Link
                                        href={route('website.template', item.id)}
                                    >
                                        {item.name}
                                    </Link>
                                </th>
                                <td className="px-6 py-4">{item.template.name}</td>
                                <td className="px-6 py-4">
                                   No
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button>
                                        <a 
                                            href={`my-website/content-edit/${item.id}`}
                                            className="font-medium text-red-600 dark:text-blue-500 hover:underline me-3"
                                        > Edit Content </a>
                                    </button>
                                    <button
                                        onClick={() => handleEdit(item.id)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr
                            className="text-center"
                            style={{ columnSpan: "100%" }}
                        >
                            <th className=""> No Data </th>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Websites;
