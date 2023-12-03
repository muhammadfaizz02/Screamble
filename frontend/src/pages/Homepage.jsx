import { useEffect, useState } from "react";
import Products from "../component/Product";
// import Component from "../component/Carousel";
import { getAllProducts } from "../modules/fetch";
import Footer from "../component/Footer";
import bg from "../assets/bg.jpg"

export default function Homepage() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getAllProducts();
            setProducts(fetchedProducts?.products || []);
            console.log(fetchedProducts, "<<<<<<<<<<<<<<,,,,,")
        };
        fetchProducts();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* <Component /> */}
            <div className="flex-grow bg-local bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10 mx-10 lg:mx-20 2xl:mx-20">
                    {products?.map((product) => (
                        <Products key={product.id} {...product} />
                    ))}
                </div>
            </div>
            <Footer />
            <a href="https://shopee.co.id/screamble#product_list" className="fixed bottom-0 w-full p-6 bg-black text-white text-xl text-center" >Beli Di Shopee Sekarang!</a>
        </div>
    );
}
