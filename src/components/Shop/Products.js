import ProductItem from './ProductItem';
import classes from './Products.module.css';

const dummyData = [{
        id: "a1",
        title: "tv",
        quantity: 1,
        price: 400,
        description: "LCD TV",
    },
    {
        id: "a2",
        title: "airpods",
        quantity: 1,
        price: 600,
        description: "latest boat airpod",
    },
]

const Products = (props) => {
    return ( <
        section className = { classes.products } >
        <
        h2 > Buy your favorite products < /h2> <
        ul > {
            dummyData.map((product) => ( <
                ProductItem key = { product.id }
                id = { product.id }
                title = { product.title }
                price = { product.price }
                description = { product.description }
                />
            ))
        }


        <
        /ul> <
        /section>
    );
};

export default Products;