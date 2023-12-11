import FrontendLayout from "@/Layouts/FrontendLayout";
import { Toaster, toast } from "react-hot-toast";
import { Link, router } from "@inertiajs/react";
import { SectionDataProvider } from "@/Context/SectionDataContext";
import SectionDataLayout from "@/Layouts/SectionDataLayout";


const Index = ({section_fields }) => {

    const handleDelete  = (id) => {
        router.delete(route('field.delete', {id : id}), {
            onSuccess : () => {
                toast.success('Field Deleted Successfully');
            },
            onError : (err) => {
                console.log(err)
            }
        });
    }
    return (
        <div>
            <div className="m-10">
                <Toaster />
                {/* Sections Data */}
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
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Data Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {section_fields.length > 0 ? (
                                section_fields.map((item) => (
                                    <tr
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        key={item.id}
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            <Link
                                                href={route(
                                                    "section.data.index",
                                                    {
                                                        section_id: item.id,
                                                    }
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.value}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.type}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.data_type}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a
                                                href="#"
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline me-3"
                                            >
                                                Edit
                                            </a>
                                            <button 
                                                type="button"
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                                onClick = {() => handleDelete(item.id)}
                                            >
                                                Delete 
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
            </div>
        </div>
    );
};

Index.layout = (page) =>
<FrontendLayout>
    <SectionDataProvider>
        <SectionDataLayout children={page} />
    </SectionDataProvider>
</FrontendLayout>;
export default Index;
