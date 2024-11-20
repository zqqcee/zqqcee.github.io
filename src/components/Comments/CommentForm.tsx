import React from 'react';
import { Input } from '@/components/ui/Input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import FormInputItem from '../Form/FormInputItem';
import CloseIcon from '../Form/CloseIcon';

// parentId:stirng
// pageId:xxxx
// email:xxx
//url:xxxx
//text:xxxx
// usename: x
const formSchema = z.object({
	email: z.string(),
	url: z.string().optional(),
	username: z.string().max(50),
	text: z.string(),
});

interface IProps {
	isReply?: boolean; //是否是回复别人的评论
	pageId: string;
	parentId?: string;
	setReplyVisible: React.Dispatch<React.SetStateAction<boolean>>;
	parentUser?: string;
}
function CommentForm(props: IProps) {
	const { isReply, pageId, parentId, parentUser, setReplyVisible } = props;
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};
	return (
		<div
			className={
				isReply
					? 'p-6 rounded-xl shadow-gray-500/60 shadow-inner ring-1 ring-gray-500 mt-5 relative'
					: 'mt-5'
			}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete={'off'}>
					<div className="flex gap-4 justify-stretch">
						<FormInputItem name="username" placeholder={'您的名称'} form={form} required />
						<FormInputItem name="email" placeholder={'邮箱'} form={form} required />
						<FormInputItem name="url" placeholder={'网址（选填）'} form={form} />
					</div>
					<FormField
						control={form.control}
						name={'text'}
						render={({ field }) => (
							<FormItem className={'flex-1'}>
								{isReply && (
									<FormLabel className="text-white pl-1">{`回复 @${parentUser}`}</FormLabel>
								)}
								<FormControl>
									<textarea
										{...field}
										className="h-[150px] box-border border border-gray-600 rounded-md p-2 bg-transparent text-white shadow-gray-700 w-full placeholder:text-gray-300 placeholder:text-sm focus-visible:outline-none text-sm"
										placeholder="请友善评论哦 :P"
										required
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* <Button type="submit">Submit</Button> */}
				</form>
			</Form>

			{/* TODO:1 添加framer-motion  2 添加submit button*/}
			{isReply && (
				<CloseIcon
					onClick={() => {
						setReplyVisible(false);
					}}
				/>
			)}
		</div>
	);
}

export default CommentForm;
