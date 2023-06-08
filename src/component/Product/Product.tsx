
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { ApiGetProducts, ApiGetCategories, Categories, Product } from '@/services/productApi';
import { formatCurrency } from '../Common';
import '@/styles/product.css'

export default function ProductsDemo() {
  const current = new Date();
  let emptyProduct: Product = {
    id: '',
    idCategory: '',
    name: '',
    brand: '',
    unsignedName: '',
    idFake: '',
    unit: '',
    image: '',
    importPrice: 0,
    wholeSalePrice: 0,
    retailPrice: 0,
    numberImport: 0,
    discount: 0,
    warrantyTime: 0,
    dateCreate: null,
    dateFix: null,
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [productDialog, setProductDialog] = useState<boolean>(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState<boolean>(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<Product[]>>(null);

  useEffect(() => {
    const fetchDataProducts = async () => {
      const products = await ApiGetProducts();
      setProducts(products);
    }

    const fetchDataCategories = async () => {
      const categories = await ApiGetCategories();
      setCategories(categories);
    }


    fetchDataProducts();
    fetchDataCategories();
  }, []);

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _products = [...products];
      let _product = { ...product };

      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        _product.id = createId();
        _product.image = 'product-placeholder.svg';
        _products.push(_product);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product: Product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product: Product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);

    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
  };

  const findIndexById = (id: string) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = (): string => {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));

    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts([]);
    toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
  };

  // const onCategoryChange = (e: RadioButtonChangeEvent) => {
  //   let _product = { ...product };

  //   _product['category'] = e.value;
  //   setProduct(_product);
  // };

  const onInputChange = (e: any, name: string) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };

    // @ts-ignore
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e: any, name: string) => {
    const val = e.value || 0;
    let _product = { ...product };

    // @ts-ignore
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
        <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length} />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return <Button label="Export" icon="pi pi-upload" className="p-button-help"
      onClick={exportCSV} />;
  };

  const imageBodyTemplate = (rowData: Product) => {
    return <img src={`${rowData.image}`}
      alt={rowData.image!} className="shadow-2 border-round" style={{ width: '64px' }} />;
  };

  const importPriceBodyTemplate = (rowData: Product) => {
    return formatCurrency(rowData.importPrice);
  };

  const wholeSalePriceBodyTemplate = (rowData: Product) => {
    return formatCurrency(rowData.retailPrice);
  };

  const retailPriceBodyTemplate = (rowData: Product) => {
    return formatCurrency(rowData.retailPrice);
  };

  const categoryBodyTemplate = (rowData: Product) => {
    const category = categories.find((item) => item.id === rowData.idCategory);
  
    if (category) {
      return <span>{category.name}</span>;
    }
  
    return null;
  };

  // const ratingBodyTemplate = (rowData: Product) => {
  //   return <Rating value={rowData.rating} readOnly cancel={false} />;
  // };

  // const statusBodyTemplate = (rowData: Product) => {
  //   return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
  // };

  const actionBodyTemplate = (rowData: Product) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2"
          onClick={() => editProduct(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger"
          onClick={() => confirmDeleteProduct(rowData)} />
      </React.Fragment>
    );
  };

  // const getSeverity = (product: Product) => {
  //   switch (product.inventoryStatus) {
  //     case 'INSTOCK':
  //       return 'success';

  //     case 'LOWSTOCK':
  //       return 'warning';

  //     case 'OUTOFSTOCK':
  //       return 'danger';

  //     default:
  //       return null;
  //   }
  // };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Products</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" placeholder="Search..."
          onInput={(e) => { const target = e.target as HTMLInputElement; setGlobalFilter(target.value); }} />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
    </React.Fragment>
  );

  return (
    <>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar className="mb-1" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

        <DataTable ref={dt} value={products} selection={selectedProducts} removableSort
          onSelectionChange={(e) => {
            if (Array.isArray(e.value)) {
              setSelectedProducts(e.value);
            }
          }}
          dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column field="id" header="Mã" exportable={false} style={{ maxWidth: '8rem' }}></Column>
          <Column field="idFake" header="Mã tắt" exportable={false} style={{ minWidth: '6rem' }}></Column>
          <Column field="name" header="Tên" sortable style={{ width: '17rem' }}></Column>
          <Column field="brand" header="Thương hiệu" style={{ minWidth: '8rem' }}></Column>
          <Column field="unit" header="Đơn vị" sortable style={{ minWidth: '8rem' }}></Column>
          <Column field="image" header="Ảnh" exportable={false} body={imageBodyTemplate}></Column>
          <Column field="importPrice" header="Giá nhập" exportable={false} body={importPriceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
          <Column field="idCategory" header="Loại" body={categoryBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
          <Column field="numberImport" header="Số lượng nhập" exportable={false} sortable style={{ minWidth: '8rem' }}></Column>
          <Column field="retailPrice" header="Giá bán lẻ" body={retailPriceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
          <Column field="wholeSalePrice" header="Giá bán sĩ" body={wholeSalePriceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
          {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
          {/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
          <Column field="discount" header="Chiết khấu" sortable style={{ minWidth: '6rem' }}></Column>
          <Column field="warrantyTime" header="Bảo hành" sortable style={{ minWidth: '6rem' }}></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '10rem' }}></Column>
        </DataTable>
      </div>

      <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
        {product.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
          alt={product.image} className="product-image block m-auto pb-3" />}
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Name
          </label>
          <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')}
            required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
          {submitted && !product.name && <small className="p-error">Name is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold">
            Description
          </label>
          <InputTextarea id="description" value="" onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
        </div>

        {/* <div className="field">
          <label className="mb-3 font-bold">Category</label>
          <div className="formgrid grid">
            <div className="field-radiobutton col-6">
              <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
              <label htmlFor="category1">Accessories</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
              <label htmlFor="category2">Clothing</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
              <label htmlFor="category3">Electronics</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
              <label htmlFor="category4">Fitness</label>
            </div>
          </div>
        </div> */}

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="price" className="font-bold">
              Price
            </label>
            <InputNumber id="price" value={product.retailPrice} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
          </div>
          <div className="field col">
            <label htmlFor="quantity" className="font-bold">
              Quantity
            </label>
            <InputNumber id="quantity" value={product.numberImport} onValueChange={(e) => onInputNumberChange(e, 'quantity')} />
          </div>
        </div>
      </Dialog>

      <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm"
        modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm"
        modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {product && <span>Are you sure you want to delete the selected products?</span>}
        </div>
      </Dialog>
    </>
  );
}
