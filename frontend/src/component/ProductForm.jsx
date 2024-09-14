import { useEffect, useState } from "react";
import { createProduct, editProduct } from "../modules/fetch";
import { Link, useNavigate } from "react-router-dom";

export default function ProductForm({ productData }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        if (!selectedImage) {
            // Handle error
            return;
        }

        const formData = new FormData(event.target);
        if (productData) {
            try {
                await editProduct(
                    productData.id,
                    formData.get("name"),
                    formData.get("description"),
                    parseInt(formData.get("price")),
                    parseInt(formData.get("discount")),
                    formData.get("link"),
                );
                console.log("Product edited successfully");
                navigate('/');
            } catch (error) {
                console.error("Error:", error.message);
            }
            return;
        }

        try {
            await createProduct(formData);
            event.target.reset();
            setSelectedImage("");
            console.log("Product created successfully");
            navigate('/');
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    useEffect(() => {
        if (productData?.image) {
            setSelectedImage(`http://localhost:3000/${productData?.image}`);
        }
    }, [productData]);

    return (
        <div className="mx-6 mt-6 sm:mx-6 md:mx-8 lg:mx-10 2xl:mx-20">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm lg:text-md 2xl:text-md font-semibold">Nama</label>
                    <input
                        name="name"
                        type="text"
                        required
                        defaultValue={productData?.name}
                        className="p-2 border rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm lg:text-md 2xl:text-md font-semibold">Deskripsi</label>
                    <textarea
                        name="description"
                        type="text"
                        required
                        defaultValue={productData?.description}
                        className="p-2 border rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm lg:text-md 2xl:text-md font-semibold">Harga</label>
                    <input
                        name="price"
                        type="number"
                        required
                        defaultValue={productData?.price}
                        className="p-2 border rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm lg:text-md 2xl:text-md font-semibold">Diskon</label>
                    <input
                        name="discount"
                        type="number"
                        required
                        defaultValue={productData?.discount}
                        className="p-2 border rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm lg:text-md 2xl:text-md font-semibold">Link Produk</label>
                    <input
                        name="link"
                        type="text"
                        required
                        defaultValue={productData?.link}
                        className="p-2 border rounded"
                    />
                </div>
                {selectedImage && (
                    <img className="w-64" src={selectedImage} alt="Selected Image" />
                )}
                {!productData?.image && (
                    <div className="flex flex-col">
                        <label className="text-sm lg:text-md 2xl:text-md font-semibold">Gambar</label>
                        <input
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setSelectedImage(URL.createObjectURL(file));
                            }}
                        />
                    </div>
                )}
                <div className="flex">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {productData ? "Edit Produk" : "Tambah Produk"}
                    </button>
                    <button
                        type="submit"
                        className="bg-red-500 text-white px-4 py-2 ml-4 rounded"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
