import React from 'react';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '../ui/Input';

interface IProps {
	name: string;
	form: UseFormReturn<any>;
	placeholder: string;
	required?: boolean;
}
function FormInputItem(props: IProps) {
	const { name, form, placeholder, required } = props;
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className={'flex-1'}>
					<FormControl>
						<Input
							placeholder={placeholder}
							{...field}
							className="bg-transparent border-gray-600 text-white shadow-sm shadow-gray-700 invalid:border-cyan-300"
							required={required}
						/>
					</FormControl>
				</FormItem>
			)}
		/>
	);
}

export default FormInputItem;
