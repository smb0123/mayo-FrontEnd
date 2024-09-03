import styles from './ProductModal.module.scss';
import { useState, useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, onSave, onDelete, newProduct, handleInputChange, handleImageChange }) {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (newProduct) {
      // If the itemImage is a string (URL), use it directly; otherwise, create an object URL
      if (typeof newProduct.itemImage === 'string') {
        setImagePreview(newProduct.itemImage);
      } else if (newProduct.itemImage instanceof File) {
        setImagePreview(URL.createObjectURL(newProduct.itemImage));
      } else {
        setImagePreview(null);
      }
    }
  }, [newProduct]);

  if (!isOpen) return null;

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>상품 관리</h2>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.imageContainer} onClick={handleImageClick}>
            {imagePreview ? (
              <img src={imagePreview} alt="상품 이미지" />
            ) : (
              <div className={styles.uploadPlaceholder}>
                <span>+</span>
              </div>
            )}
            <input
              type="file"
              id="imageUpload"
              className={styles.imageUpload}
              onChange={handleImageChange}
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }} // 파일 입력을 숨김 처리
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="itemName">상품명</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={newProduct.itemName || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="itemDescription">상품 설명</label>
            <textarea
              id="itemDescription"
              name="itemDescription"
              value={newProduct.itemDescription || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="originalPrice">원래 가격</label>
            <input
              type="number"
              id="originalPrice"
              name="originalPrice"
              value={newProduct.originalPrice || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="salePrice">할인 후 가격</label>
            <input
              type="number"
              id="salePrice"
              name="salePrice"
              value={newProduct.salePrice || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="salePercent">할인율 (%)</label>
            <input
              type="number"
              id="salePercent"
              name="salePercent"
              value={newProduct.salePercent || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="itemQuantity">재고 수량</label>
            <input
              type="number"
              id="itemQuantity"
              name="itemQuantity"
              value={newProduct.itemQuantity || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="cookingTime">조리 시간 (분)</label>
            <input
              type="number"
              id="cookingTime"
              name="cookingTime"
              value={newProduct.cookingTime || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="additionalInformation">추가 정보</label>
            <input
              type="text"
              id="additionalInformation"
              name="additionalInformation"
              value={newProduct.additionalInformation || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={styles.modalButtons}>
          <button onClick={onDelete} className={styles.deleteButton}>
            메뉴 삭제
          </button>
          <button onClick={onSave} className={styles.saveButton}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
