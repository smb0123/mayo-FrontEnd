'use client';
import styles from './page.module.scss';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import ProductModal from '@/components/page-layout/ProductModal/Modal';
import axiosInstanceinfo from '@/apis/axiosInstanceinfo';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const storeId = 'VQtTGTCc13EWulU5sZmI'; // storeId를 설정

  // 서버에서 제품 데이터를 가져오는 함수
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstanceinfo.get('/item-store', {
          params: { storeId: storeId } // storeId를 쿼리 파라미터로 전달
        });
        setProducts(response.data); // 서버에서 가져온 제품 목록을 상태로 설정
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [storeId]);


  const openModal = (product) => {
    setSelectedProduct(product || {
      itemId: '',
      itemName: '',
      itemDescription: '',
      originalPrice: 0,
      salePercent: 0.0,
      itemQuantity: 0,
      itemOnSale: true,
      itemImage: '',
      salePrice: 0.0,
      cookingTime: null,
      additionalInformation: ''
    });
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedProduct((prevProduct) => ({
        ...prevProduct,
        itemImage: file, // 파일 객체 설정
        itemImageUrl: URL.createObjectURL(file), // 브라우저에서 사용하기 위한 URL 생성
      }));
    }
  };

  const addProduct = async () => {
    try {
      const formData = new FormData();

      // JSON 데이터를 Blob으로 변환해서 request 필드로 추가
      const jsonRequest = {
        itemName: selectedProduct.itemName,
        itemDescription: selectedProduct.itemDescription,
        originalPrice: selectedProduct.originalPrice,
        salePercent: selectedProduct.salePercent,
        salePrice: selectedProduct.salePrice,
        cookingTime: selectedProduct.cookingTime,
        additionalInformation: selectedProduct.additionalInformation,
      };
      formData.append('request', new Blob([JSON.stringify(jsonRequest)], { type: 'application/json' }));

      // 파일 추가
      if (selectedProduct.itemImage) {
        formData.append('itemImage', selectedProduct.itemImage);
      }

      const response = await axiosInstanceinfo.post('/item', formData, {
        params: { storeId: storeId },
      });

      setProducts((prevProducts) => [...prevProducts, response.data]);
      alert('저장 완료되었습니다.');
      closeModal();
    } catch (err) {
      console.error("제품 저장 중 오류 발생:", err);
      alert('저장에 실패했습니다.');
    }
  };

  const updateProduct = async () => {
    try {
      const formData = new FormData();

      // JSON 데이터를 Blob으로 변환해서 request 필드로 추가
      const jsonRequest = {
        itemId: selectedProduct.itemId, // itemId를 JSON 데이터에 포함
        itemName: selectedProduct.itemName,
        itemDescription: selectedProduct.itemDescription,
        originalPrice: selectedProduct.originalPrice,
        salePercent: selectedProduct.salePercent,
        salePrice: selectedProduct.salePrice,
        cookingTime: selectedProduct.cookingTime,
        additionalInformation: selectedProduct.additionalInformation,
      };
      formData.append('request', new Blob([JSON.stringify(jsonRequest)], { type: 'application/json' }));

      // 파일 추가
      if (selectedProduct.itemImage) {
        formData.append('itemImage', selectedProduct.itemImage);
      }

      // PUT 요청 전송
      await axiosInstanceinfo.put('/item', formData, {
        params: { itemId: selectedProduct.itemId }, // itemId를 쿼리 파라미터로 추가
      });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.itemId === selectedProduct.itemId ? { ...product, ...selectedProduct } : product
        )
      );
      alert('수정 완료되었습니다.');
      closeModal();
    } catch (err) {
      console.error("제품 수정 중 오류 발생:", err);
      alert('수정에 실패했습니다.');
    }
  };

  const deleteProduct = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await axiosInstanceinfo.delete('/item', {
          params: { itemId: selectedProduct.itemId },
        });
        setProducts(products.filter(product => product.itemId !== selectedProduct.itemId));
        alert('삭제가 완료되었습니다.');
        closeModal();
      } catch (err) {
        console.error("제품 삭제 중 오류 발생:", err);
        alert('삭제에 실패했습니다.');
      }
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
        <div className={styles.item} onClick={() => openModal(null)}>
          <div className={styles.addIcon}>+</div>
        </div>
        {products.map((product) => (
          <div key={product.itemId} className={styles.item} onClick={() => openModal(product)}>
            {product.itemImageUrl ? (
              <img src={product.itemImageUrl} alt="상품 이미지" className={styles.productImage} />
            ) : (
              <div className={styles.placeholderImage}>사진 필요</div>
            )}
            <div className={styles.productName}>{product.itemName}</div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <ProductModal
          isOpen={modalOpen}
          onClose={closeModal}
          onSave={selectedProduct.itemId ? updateProduct : addProduct} // 새 제품일 경우 추가, 기존 제품일 경우 수정
          onDelete={deleteProduct} // 삭제 함수 전달
          newProduct={selectedProduct}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange} // 이미지 변경 핸들러 추가
        />
      )}
    </div>
  );
}
