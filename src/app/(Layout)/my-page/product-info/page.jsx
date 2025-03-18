'use client';
import styles from './page.module.scss';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import ProductModal from '@/components/common/ProductModal/ProductModal';
import multiPartAxiosInstance from '@/apis/multiPartAxiosInstance'; // multipart axios 인스턴스 사용
import { useRouter } from 'next/navigation';
import ROUTE from '@/constants/route';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [storeId, setStoreId] = useState(null); // storeId를 상태로 저장
  const router = useRouter();

  // 사용자 정보를 가져오는 함수
  const fetchUserInfo = async () => {
    try {
      const response = await multiPartAxiosInstance.get('/user'); // /user API 호출
      const userData = response.data;
      if (userData && userData.storeRef) {
        setStoreId(userData.storeRef); // storeRef를 storeId로 설정
      }
    } catch (err) {
      console.error('사용자 정보를 가져오는 중 오류 발생:', err);
    }
  };

  // 제품 데이터를 가져오는 함수
  const fetchProducts = async () => {
    if (!storeId) return; // storeId가 없으면 데이터를 가져오지 않음

    try {
      const response = await multiPartAxiosInstance.get('/item-store', {
        params: { storeId: storeId }, // storeId를 쿼리 파라미터로 전달
      });
      const productsWithSignedUrls = response.data.map((product) => {
        if (product.itemImage) {
          product.itemImageUrl = product.itemImage;
        }
        return product;
      });
      setProducts(productsWithSignedUrls); // 서버에서 가져온 제품 목록을 상태로 설정
    } catch (err) {
      console.error('제품을 가져오는 중 오류 발생:', err);
    }
  };

  useEffect(() => {
    fetchUserInfo(); // 컴포넌트 마운트 시 사용자 정보를 먼저 가져옴
  }, []);

  useEffect(() => {
    if (storeId) {
      fetchProducts(); // storeId를 얻은 후에 제품 데이터를 가져옴
    }
  }, [storeId]);

  const openModal = (product) => {
    setSelectedProduct(
      product || {
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
        additionalInformation: '',
      }
    );
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

      if (selectedProduct.itemImage) {
        formData.append('itemImage', selectedProduct.itemImage);
      }

      const response = await multiPartAxiosInstance.post('/item', formData, {
        params: { storeId: storeId },
      });

      setProducts((prevProducts) => [...prevProducts, response.data]);
      alert('저장 완료되었습니다.');
      closeModal();
      window.location.reload();
    } catch (err) {
      console.error('제품 저장 중 오류 발생:', err);
      alert('저장에 실패했습니다.');
    }
  };

  const updateProduct = async () => {
    try {
      const formData = new FormData();

      const jsonRequest = {
        itemId: selectedProduct.itemId,
        itemName: selectedProduct.itemName,
        itemDescription: selectedProduct.itemDescription,
        originalPrice: selectedProduct.originalPrice,
        salePercent: selectedProduct.salePercent,
        salePrice: selectedProduct.salePrice,
        cookingTime: selectedProduct.cookingTime,
        additionalInformation: selectedProduct.additionalInformation,
      };
      formData.append('request', new Blob([JSON.stringify(jsonRequest)], { type: 'application/json' }));

      if (selectedProduct.itemImage) {
        formData.append('itemImage', selectedProduct.itemImage);
      }

      await multiPartAxiosInstance.put('/item', formData, {
        params: { itemId: selectedProduct.itemId },
      });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.itemId === selectedProduct.itemId ? { ...product, ...selectedProduct } : product
        )
      );
      alert('수정 완료되었습니다.');
      closeModal();
    } catch (err) {
      console.error('제품 수정 중 오류 발생:', err);
      alert('수정에 실패했습니다.');
    }
  };

  const deleteProduct = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await multiPartAxiosInstance.delete('/item', {
          params: { itemId: selectedProduct.itemId },
        });
        setProducts(products.filter((product) => product.itemId !== selectedProduct.itemId));
        alert('삭제가 완료되었습니다.');
        closeModal();
      } catch (err) {
        console.error('제품 삭제 중 오류 발생:', err);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storeId = localStorage.getItem('storeId');

    if (!token) {
      alert('로그인 정보가 없습니다. 다시 로그인해주세요');
      return router.push(ROUTE.HOME);
    }

    if (!storeId) {
      alert('가게 정보가 없습니다. 다시 로그인해주세요');
      return router.push(ROUTE.HOME);
    }
  }, [router]);

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
          onSave={selectedProduct.itemId ? updateProduct : addProduct}
          onDelete={deleteProduct}
          newProduct={selectedProduct}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
        />
      )}
    </div>
  );
}
