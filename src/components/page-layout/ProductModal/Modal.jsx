import styles from './Modal.module.scss';
import { useState } from 'react';

export default function Modal({ isOpen, onClose, onSave, onDelete, newProduct, handleInputChange }) {
  const [imagePreview, setImagePreview] = useState(null);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>상품 관리</h2>
          <button className={styles.closeButton} onClick={onClose}>X</button>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.imageContainer}>
            {imagePreview ? (
              <img src={imagePreview} alt="상품 이미지" />
            ) : (
              <label htmlFor="imageUpload" className={styles.uploadLabel}>
                <span>+</span>
              </label>
            )}
            <input
              type="file"
              id="imageUpload"
              className={styles.imageUpload}
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="name">상품명</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description">상품설명</label>
            <input
              type="text"
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="priceBefore">할인 전 가격</label>
            <input
              type="text"
              id="priceBefore"
              name="priceBefore"
              value={newProduct.priceBefore}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="priceAfter">할인 후 가격</label>
            <input
              type="text"
              id="priceAfter"
              name="priceAfter"
              value={newProduct.priceAfter}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="discount">할인율</label>
            <input
              type="text"
              id="discount"
              name="discount"
              value={newProduct.discount}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="additionalInfo">추가 전달사항</label>
            <input
              type="text"
              id="additionalInfo"
              name="additionalInfo"
              value={newProduct.additionalInfo}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="preparationTime">조리시간</label>
            <input
              type="text"
              id="preparationTime"
              name="preparationTime"
              value={newProduct.preparationTime}
              onChange={handleInputChange}
            />
          </div>

        </div>
        <div className={styles.modalButtons}>
          <button onClick={onDelete} className={styles.deleteButton}>메뉴삭제</button>
          <button onClick={onSave} className={styles.saveButton}>저장</button>
        </div>
      </div>
    </div>
  );
}
