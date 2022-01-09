import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cartActions from '../store/actions/cart';
import logo from '../../assets/images/shine.gif';
import './style.css';
const Cart = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();

    let totalPrice = 0;

    for(let i = 0; i < cart.Cart.length; i++) {
        totalPrice += (cart.Cart[i].price * cart.Cart[i].quantity)
    }

    if(cart.value > 0){
        localStorage.setItem('dioshopping: cart', JSON.stringify(cart))
    }

    return(
        <>
            <button type="button" style={{border: '5px solid blue'}} className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#CartModal">
                <span><i className="fas fa-shopping-cart"></i></span>
                <span className="badge rounded-pill bg-info text-dark">
                    {cart.value}
                </span>
            </button>

            {/* Modal */}
            <div className="modal fade" style={{backgroundColor: 'rgba(130,80,255,0.15)'}} id="CartModal" tabIndex="-1" aria-labelledby="CartModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-container modal-container-center" style={{backgroundColor: 'rgba(130,80,255,0.15)'}}>
                    <div className="modal-content modal-container" >
                    <div className="modal-header p-2" style={{backgroundColor: 'rgba(130,80,255,0.35)'}}>
                        {/* <h5 className="modal-title" id="CartModalLabel">Meu Carrinho</h5> */}
                        <img src={logo} alt="Logotipo da store" />                        
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body table-responsive fontes modal-container" style={{backgroundColor: 'rgba(130,80,255,0.15)'}}>
                        <table className="table table-hover">
                        <thead >
                            <tr >
                            <th scope="col"></th>
                            <th scope="col">Produto</th>
                            <th scope="col">Qtd</th>
                            <th scope="col">Preço R$</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">Total R$</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.Cart.map( item =>{
                                return(
                                    <tr key={item.id} style={{lineHeight: '50px'}}>
                                        <th><button onClick={()=>dispatch(cartActions.DeleteItem(cart, item))} className="p-1 m-1 badge btn-outline-danger btn-colors-danger"><i className="fas fa-window-close"></i></button></th>
                                        <th><img className="img-fluid img-thumbnail" src={item.image} alt={item.Name} width="50px"/></th>
                                        <th><span className="badge badge-pill bg-warning">
                                            {item.quantity}
                                        </span></th>
                                        <th>{item.price.toFixed(2)}</th>
                                        <th><button onClick={()=>dispatch(cartActions.AddItem(cart, item))} className="badge badge-pill btn btn-outline-primary btn-colors-primary"><i className="fas fa-plus"></i></button></th>
                                        <th><button onClick={()=>dispatch(cartActions.RemoveItem(cart, item))} className="badge badge-pill btn-outline-warning btn-colors-warning"><i className="fas fa-minus"></i></button></th>
                                        <th>{(item.price * item.quantity).toFixed(2)}</th>
                                    </tr>
                                )
                            })}
                            <tr>
                            <th colSpan="2" scope="col">Total</th>
                            <th colSpan="3">{cart.value} itens</th>
                            <th colSpan="2">R$ {totalPrice.toFixed(2)}</th>
                            </tr>
                        </tbody>
                        </table>
                        </div>

                    <div className="modal-footer modal-container" style={{backgroundColor: 'rgba(130,80,255,0.65)'}}>
                        <button type="button" style={{border: '5px solid blue'}} className="btn btn-outline-primary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;
