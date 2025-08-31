import React from 'react';
import '../../shared/styles/panda-tokens.css';
import OperationForm from '../../features/forms/OperationForm/OperationForm';

const OperationEditorPage: React.FC = () => {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Операция</h1>
        <p>Создание/редактирование операции</p>
      </header>
      <div className="card">
        <OperationForm
          mode="create"
          initial={{
            title: 'Оплата интернета',
            amount: 600 as any,
            type: 'expense',
            category: 'Коммуналка',
            date: new Date().toISOString().slice(0, 10),
            note: '',
          }}
        />
      </div>
    </div>
  );
};
export default OperationEditorPage;
