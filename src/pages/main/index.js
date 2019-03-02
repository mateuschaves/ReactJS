import React, { Component } from 'react';
import api from "../../services/api";
import { Link } from 'react-router-dom';

import "./styles.css";

export default class Main extends Component {

    state = {
        products: [],
        productInfo: {},
        page: 1
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
         const response = await api.get(`/products?page=${page}`);
         const { docs, ...productInfo } = response.data;
         this.setState({ products: docs, productInfo, page});
         //this.state.products = response.data.docs;
    }

    prevPage = () => {
        const { page } = this.state;

        if(page == 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    }

    nexPage = () => {
        const { page, productInfo } = this.state;

        if(page == productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    render() {
        const { products, page, productInfo } = this.state;
        return (
            <div className="product-list">
                    { products && this.state.products.map( (product, index) => {
                        return (
                            <article key={index}>
                                <strong> { product.title } </strong>
                                <p> {product.description} </p>

                                <Link to={`/products/${product._id}`}>Acessar</Link>
                            </article>
                        );
                    } )}

                <div className="actions">
                    <button disabled={page == 1} onClick={this.prevPage} > Anterior </button>
                    <button disabled={page == productInfo.pages} onClick={this.nexPage}> Próximo </button>
                </div>
            </div>
        )
    }
}