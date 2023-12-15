import React, { useContext } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { PageContext } from "@/Context/PageContext";
import Edit from "./Edit";

const Items = ({pages}) => {
    const {template_id} = usePage().props;
    const {setEditVisible} = useContext(PageContext)
    const handleEdit = (id) => {
        router.get(route('page.index'), {template_id : template_id, page_id : id}, {
            preserveState : false,
            onSuccess : () => {
                setEditVisible(true)
            }
        });
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
                            Variable Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            isPremium
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {pages.length > 0 ? (
                        pages.map((item) => (
                            <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                key={item.id}
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    <Link
                                        href={route("section.index", {
                                            page_id: item.id,
                                            template_id : template_id
                                        })}
                                    >
                                        {item.name}
                                    </Link>
                                </th>
                                <td className="px-6 py-4">
                                    {item.value}
                                </td>
                                <td className="px-6 py-4">
                                    {item.isPremium == 0 ? "No" : "Yes"}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        onClick={() => handleEdit(item.id)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <th> No Data </th>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Items;
