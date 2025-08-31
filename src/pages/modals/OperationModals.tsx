import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AutoOpenModal from '../../components/ui/Modal/AutoOpenModal';
import OperationForm from '../../features/forms/OperationForm/OperationForm';

export const NewOperationModal: React.FC = () => {
  const navigate = useNavigate();
  const onClose = () => navigate('/operations');
  return (
    <AutoOpenModal onClose={onClose} title="Новая операция">
      <OperationForm mode="create" />
    </AutoOpenModal>
  );
};

export const EditOperationModal: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const onClose = () => navigate('/operations');
  return (
    <AutoOpenModal onClose={onClose} title={`Редактирование операции #${id}`}>
      <OperationForm mode="edit" initial={{ title: 'Операция', amount: 100, category: '', type: 'expense', date: new Date().toISOString().slice(0,10), note: '' }} />
    </AutoOpenModal>
  );
};
