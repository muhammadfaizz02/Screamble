export default function Products({ id, name, image, description, price, discount, link }) {
    return (
        <div onClick={() => {
            window.location.href = `/products/${id}`;
        }}>
            <div className="text-left bg-white" key={id}>
                <img src={`http://localhost:3000/${image}`} className="" />
                <div className="px-6 py-3">
                    <h3 className="font-bold text-sm md:text-xl lg:text-xl"><span className="font-medium text-gray-700 italic mr-2 line-through text-sm md:text-xl lg:text-xl">Rp {price}</span> Rp {discount}</h3>
                    <p className="text-sm font-semibold text-gray-900 mt-1 md:text-xl lg:text-xl">{name}</p>
                </div>
            </div>
        </div>
    );
}