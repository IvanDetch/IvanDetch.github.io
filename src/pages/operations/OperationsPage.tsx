import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeOperations } from '../../lib/demoData';
let OperationList: any;
try { OperationList = require('../../components/finance/Operations/OperationList').OperationList; } catch { }
import { useTranslation } from 'react-i18next';

const OperationsPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const items = React.useMemo(() => makeOperations(20), []);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2>{t('operations.title', 'Операции')}</h2>
        <Link
          to="/operations/new"
          state={{ backgroundLocation: location }}
          className="btn btn-primary"
        >
          {t('operations.addOperation', 'Добавить операцию')}
        </Link>
      </div>

      {OperationList ? (
        <OperationList
          items={items}
          renderActions={(op: any) => (
            <Link
              to={`/operations/${op.id}/edit`}
              state={{ backgroundLocation: location }}
              className="btn btn-ghost"
            >
              <img className='iconEdit'/>
            </Link>
          )}
        />
      ) : (
        <div style={{ display: 'grid', gap: 8 }}>
          {items.map((op: any) => (
            <div
              key={op.id}
              style={{
                padding: 12, border: '1px solid #eee', borderRadius: 12,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{op.title}</div>
                <div style={{ opacity: 0.7, fontSize: 12 }}>{op.date}</div>
              </div>
              <div style={{ color: op.type === 'income' ? 'green' : 'crimson', width: 80, textAlign: 'right' }}>
                {op.amount}
              </div>
              <Link
                to={`/operations/${op.id}/edit`}
                state={{ backgroundLocation: location }}
                className="btn btn-ghost"
              >
                <img className='iconEdit'/>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default OperationsPage;
