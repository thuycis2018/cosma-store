"use server";
import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { createProductAction } from "@/utils/actions";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import CheckboxInput from "@/components/form/CheckboxInput";

function CreateProduct() {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>create product</h1>
      <div className='border p-8 rounded-md'>
        <FormContainer action={createProductAction}>
          <div className='grid gap-4 md:grid-cols-2 my-4'>
            <FormInput type='text' name='name' label='name' />
            <FormInput type='text' name='company' label='company' />
            <FormInput type='text' name='slug' label='friendly url' />
            <PriceInput />
            <ImageInput />
          </div>
          <TextAreaInput name='description' labelText='description' />
          <div className='mt-6'>
            <CheckboxInput name='featured' label='featured' />
          </div>

          <SubmitButton text='Create' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProduct;
