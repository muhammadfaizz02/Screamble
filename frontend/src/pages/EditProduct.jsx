import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../component/ProductForm";
import { getProductDetailById } from "../modules/fetch";

export default function EditProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductDetailById(id);
                setProduct(response.product);
            } catch (e) {
                console.log(e);
            }
        };
        fetchProduct();
    }, [id]);

    return (
        <div className="container mx-auto mt-4 p-4">
            <ProductForm productData={product} />
        </div>
    );
}
