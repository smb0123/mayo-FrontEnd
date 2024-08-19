'use client';
import styles from './page.module.scss';
import { useState } from 'react';
import Link from 'next/link';
import ProductModal from '@/components/page-layout/ProductModal/Modal';

export default function ProductList() {
  const [products, setProducts] = useState([
    { id: 1, name: '아메리카노', img: 'https://via.placeholder.com/150x100', description: '아메리카노 설명', priceBefore: '5000', priceAfter: '4000', discount: '20%', additionalInfo: '추가 전달 사항 없음', preparationTime: '5분' },
    { id: 2, name: '카페라떼', img: 'https://via.placeholder.com/150x100', description: '카페라떼 설명', priceBefore: '6000', priceAfter: '4800', discount: '20%', additionalInfo: '우유 선택 가능', preparationTime: '7분' },
    //api 연결하기
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const addProduct = () => {
    const newId = products.length + 1;
    setProducts((prevProducts) => [
      ...prevProducts,
      {
        id: newId,
        name: selectedProduct.name,
        img: '',
        description: selectedProduct.description,
        priceBefore: selectedProduct.priceBefore,
        priceAfter: selectedProduct.priceAfter,
        discount: selectedProduct.discount,
        additionalInfo: selectedProduct.additionalInfo,
        preparationTime: selectedProduct.preparationTime,
      },
    ]);

    alert('저장 완료되었습니다.');
    closeModal();
  };

  const deleteProduct = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      setProducts(products.filter(product => product.id !== selectedProduct.id));
      alert('삭제가 완료되었습니다.');
      closeModal();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/my-page">
          <button className={styles.backButton}>뒤로가기</button>
        </Link>
      </div>
      <div className={styles.grid}>
        <div className={styles.item} onClick={() => openModal({})}>
          <div className={styles.addIcon}>+</div>
        </div>
        {products.map((product) => (
          <div key={product.id} className={styles.item} onClick={() => openModal(product)}>
            <img src="https://via.placeholder.com/150x100" alt="상품 이미지" className={styles.productImage} />
            <div className={styles.productName}>{product.id}.{product.name}</div>
          </div>  
        ))}
      </div>

      {modalOpen && (
        <ProductModal
          isOpen={modalOpen}
          onClose={closeModal}
          onSave={addProduct}
          onDelete={deleteProduct} // 삭제 함수 전달
          newProduct={selectedProduct}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
}
