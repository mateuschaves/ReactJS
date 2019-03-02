import React, { Component } from 'react';
import api from "../../services/api";

import "./styles.css";

export default class Main extends Component {

    state = {
        products: [],
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async () => {
         const response = await api.get('/products');
         this.setState({ products: response.data.docs });
         //this.state.products = response.data.docs;
    }

    render() {
        const { products } = this.state;
        return (
           <div className="product-list">
                { products && this.state.products.map( (product, index) => {
                    return (
                        <article key={index}>
                            <strong> { product.title } </strong>
                            <p> {product.description} </p>

                            <a href="#"> Detalhes </a>
                        </article>
                    );
                } )}
           </div>
        )
    }
}