import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteProduct, getProductDetailById } from "../modules/fetch";
import bg from "../assets/bg.jpg"
import Footer from "../component/Footer";

export default function ProductDetails() {
    const [product, setProduct] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductDetailById(id);
                setProduct(response.product);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        };
        fetchProduct();
    }, [id]);

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(id);
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="bg-local bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
            {isLoading ? (
                <div className="skeleton"></div>
            ) : (
                <div className="flex flex-col justify-center items-center">
                    <div className="w-full flex flex-col justify-center items-center">
                        {product && product.image && (
                            <img
                                src={`http://localhost:3000/${product.image}`}
                                alt={product.name}
                                className="w-4/5 p-4 md:w-3/5 lg:w-1/2 2xl:w-1/2"
                            />
                        )}
                    </div>
                    <div className="text-left p-6 bg-white w-full">
                        <h1 className="text-2xl mb-2 lg:text-2xl 2xl:text-2xl font-semibold">{product && product.name}</h1>
                        <p className="font-bold text-2xl md:text-2xl lg:text-2xl"><span className="font-medium text-gray-700 italic mr-2 line-through">Rp {product && product.price}</span> Rp {product && product.discount}</p>
                        <div className="my-6 text-center">
                            <a href={product && product.link} className="inline-block w-full px-4 py-4 bg-gray-900 text-white text-xl">
                                Beli Sekarang
                            </a>
                        </div>

                        <p className="text-xl mb-6 text-black font-medium">{product && product.description}</p>
                        {localStorage.getItem('token') && (
                            <div className="flex">
                                <div className="relative inline-block">
                                    <button className="bg-red-500 text-xl text-white py-2 px-8 rounded">
                                        Delete
                                    </button>
                                    <div className="hidden absolute z-50 bg-white border border-gray-300 p-4 mt-2">
                                        <h2 className="text-xl font-semibold mb-2">Konfirmasi</h2>
                                        <p className="mb-4">Anda Yakin Menghapus Produk Ini?</p>
                                        <button onClick={handleDeleteProduct} className="bg-red-500 text-xl text-white py-2 px-8 rounded">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <Link to={`/editproduct/${id}`}>
                                    <button className="bg-blue-500 text-white text-xl py-2 px-8 ml-2 rounded">Edit</button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}
