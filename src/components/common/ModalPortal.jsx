import { useState } from 'react';
import { createPortal } from 'react-dom';
import useIsMounted from '../../hooks/useIsMounted';

export default function ModalPortal({ children }) {
  const [mounted, setMounted] = useState(false);

  useIsMounted(setMounted);

  if (typeof window === 'undefined' || !mounted) return null;

  return createPortal(children, document.getElementById('modal-root'));
}
