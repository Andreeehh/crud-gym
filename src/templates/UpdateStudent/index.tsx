import { useSession } from 'next-auth/client';
import { FormStudent } from '../../components/FormStudent';
import { Wrapper } from '../../components/Wrapper';
import React from 'react';

export function UpdateStudentTemplate() {
  const [session] = useSession();

  const handleSave = null;

  // if (!post) {
  //   return (
  //     <Wrapper>
  //       <p>Post does not exist</p>
  //     </Wrapper>
  //   );
  // }

  return (
    <Wrapper>
      <FormStudent onSave={handleSave} />
    </Wrapper>
  );
}
