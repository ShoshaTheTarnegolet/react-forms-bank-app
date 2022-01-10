import React, { useContext } from 'react';
import { Context } from '../context/context.js';
import Text from './Text';

export default function TextBlock() {
  const appContext = useContext(Context);

  return (
    <>
      <div className="text_block ">
        <div className="text_column">
          <Text title=" שם פרטי" info={appContext.name} />
          <Text title="שם המשפחה" info={appContext.last_name} />
          <Text title="תעודת זהות" info={appContext.id} />
          <Text title="תאריך לידה" info={appContext.birth_date} />
        </div>


        <div className="text_column">
          <Text title="טלפון" info={appContext.phone} />
          <Text title="דואר אלקטרוני" info={appContext.email} />
          <Text title="שם העסק" info={appContext.company_name} />
          <Text title="ח.פ/שותפות/עמותה" info={appContext.company_id} />
        </div>
      </div>
    </>
  );
}
