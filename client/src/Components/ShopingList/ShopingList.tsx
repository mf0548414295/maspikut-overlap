import { useEffect, useState } from "react";
import { FINISH_ORDER, PRODUCTS, PRODUCTS_TOTAL, PRODUCT_ADD_BUTTON, PRODUCT_CATEGORY, PRODUCT_PLACEHOLDER } from "../Common/CommonConstants";
import classes from './ShopingList.module.scss';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { categoriesSelect } from "./ShopingList.StyleSheet";
import { useDispatch, useSelector } from "react-redux";
import { incrementProduct } from "../../Redux/counterReducer";
import { RootState } from "../../Redux/store";
import { Category } from "../../ApiServices/Models/Category";
import { getCategories } from "../../Services/category.service";
import { Link } from "react-router-dom";

function ShopingList() {
  const [selectedCategory,setSelectedCategory]=useState<string>();
  const [selectedProduct,setSelectedProduct]=useState<string>();
  const [categories,setCategories]=useState<Category[]>();
  const dispatch = useDispatch();
  const totalItem=useSelector((state:RootState) => state.counter.find(product=>product.name==='totalItems'))?.quantity;
  const products=useSelector((state:RootState) => state.counter.filter(product=>product.name!=='totalItems'));

  useEffect(()=>{
    getCategories().then(data=>setCategories(data))
  },[])
  const productElement=(category:Category)=>
    products.filter(product=>product.quantity>0 && product.category===category.name)
              .map(product=>
                <div className={classes.category}>
                <span>{product.name}</span>
                {product.quantity>1 &&<span>{product.quantity}</span>}
              </div>); 
  const addProductHandle = () => {
    if(!selectedProduct || !selectedCategory){
      alert('יש להכניס שם מוצר וקטגוריה');
    }
    dispatch(incrementProduct({name:selectedProduct,category:selectedCategory}));
    setCategories(prevCategories=>prevCategories?.map(category=>category.name===selectedCategory?
        ({...category,productsSum:category.productsSum+1})
        :category))
  };
  const chooseCategoryHandle = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
  };
  const chooseProductHandle = (event: SelectChangeEvent) => {
    setSelectedProduct(event.target.value as string);
  };

  return (
   <div className={classes.shopingListContainer}>
    <div className={classes.chooseProductContainer}>
    <span>{`${PRODUCTS_TOTAL} ${totalItem} ${PRODUCTS}`}</span>
    <input placeholder={PRODUCT_PLACEHOLDER} onBlur={chooseProductHandle}/>
    <FormControl sx={categoriesSelect}>
      <InputLabel>{PRODUCT_CATEGORY}</InputLabel>
      <Select
        value={selectedCategory}
        onChange={chooseCategoryHandle}
        label={PRODUCT_CATEGORY}
        >
          {categories?.map(category=><MenuItem value={category.name}>{category.name}</MenuItem>)}
      </Select>
    </FormControl>
    <button onClick={addProductHandle}>{PRODUCT_ADD_BUTTON}</button>
    <Link to='productOrderSummary'>
      <button>{FINISH_ORDER}</button>
    </Link>
    </div>
    <div className={classes.productsByCategory}>
      {categories?.filter(category=>category.productsSum>0).map(category=>
        <div className={classes.oneProductByCategory}>
          <div className={classes.category}>
            <span>{category.name}</span>
            <span>{category.productsSum}</span>
          </div>
          {productElement(category)}
        </div>
        )}
    </div>
   </div>
  )
}

export default ShopingList;