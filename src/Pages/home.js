import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Paper, Grid, Typography, List, makeStyles } from '@material-ui/core/';
import Item from '../components/Item';
import Card from '../components/Card';
import './style.css';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: '5px',
    },
    paper: {
      padding: 0,
      textAlign: 'center'
    },
  }));

const HomePage = () => {
    const products = useSelector(state => state.products)
    const classes = useStyles();

    // const [selectedCategory, setSelectedCategory] = useState('todos');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const categorys = products.map(
        category => {
            const container = { };
            container['id'] = category.id_categorys;
            container['name'] = category.name_categorys;
            return container;
        }
    )    

    const handleSelectCategory = (selectedCategoria) => {
        //alert(selectedCategory)        
        if ( selectedCategoria === 'todos'){
            setSelectedProducts(products);            
        } else {
            const produtos = products.filter( item => item.name_categorys === selectedCategoria )        
            setSelectedProducts(produtos);
        }
    }

    useEffect(() => {
        setSelectedProducts(products);
    }, [])

    const category = categorys.map(JSON.stringify)
                    .filter(function(item, index, arr){
                        return arr.indexOf(item, index + 1) === -1;
                    })
                    .map(JSON.parse)

    const arrayCategory = categorys.map(category => category.name)
    let count = { };

    for(let i = 0; i < arrayCategory.length; i++){
        
        let key = arrayCategory[i];
        count[key] = (count[key] ? count[key] + 1 : 1)
        
    }

    return(
        // <div container spacing={3} className={classes.root}>
        <div className="container-fluid row px-0 py-2 m-0 justify-content-between" style={{backgroundColor: 'rgba(130,80,255,0.15)'}} >
            <Grid className="col-lg-2 col-md-3 col-sm-5 col-xs-12 m-1 borda p-0" style={{borderRadius:'15px'}} >
                <Paper className={classes.paper} style={{borderRadius:'15px'}}>
                    <Typography variant='h5'>
                        <span className="font-home1">Categorias</span>
                    </Typography>
                    <List className="m-0 p-1" style={{backgroundColor:'#cca2ff', width:'100%'}}>
                        <Item
                            className="m-1"
                            key = {'dsada0'} 
                            name="todos"
                            details={categorys.length}
                            font = {{
                                color: '#8c52ff',
                                textShadow: '1px 1px 2px #5c32ff',
                                fontFamily: 'cursive',
                                backgroundColor: '#cca2ff',
                                display: 'block',
                                width: '100%',
                                padding: '10px 5px',
                                borderRadius: '10px'
                                }
                            }
                            onClick={handleSelectCategory}                                        
                        />
                        {category.map(
                            category => {
                                return (
                                    <Item
                                        className="m-1"
                                        key = {category.id} 
                                        name= {category.name}
                                        details={count[category.name]}
                                        font = {{
                                            color: '#8c52ff',
                                            textShadow: '1px 1px 2px #5c32ff',
                                            fontFamily: 'cursive',
                                            backgroundColor: '#cca2ff',
                                            display: 'block',
                                            width: '100%',
                                            padding: '10px 5px',
                                            borderRadius: '10px'
                                            }
                                        }
                                        onClick={handleSelectCategory}                                        
                                    />
                                )
                            }
                        )}
                    </List>
                </Paper>
            </Grid>
            <Grid className="col-lg-10 col-md-9 col-sm-7 col-xs-12 d-flex row justify-content-between">
                {selectedProducts.map(item => {
                    return(
                        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mt-1 mb-1" key={item.id_product}>
                        <Card className="justify-content-center"
                            // key={item.id_product}
                            product={item}
                        >
                            {item.name_product}
                        </Card>
                        </div>
                    )
                })}
            </Grid>
        </div>
    )
}

export default HomePage;
