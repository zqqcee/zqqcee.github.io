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
import { motion, AnimatePresence } from 'motion/react';
import TextArea from '../Form/TextArea';
import { postComments } from '@/scripts/api/comments';

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
	parentId?: number;
	setReplyVisible?: React.Dispatch<React.SetStateAction<boolean>>;
	parentUser?: string;
}
function CommentForm(props: IProps) {
	const { isReply, pageId, parentId, parentUser, setReplyVisible } = props;
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const comment = { ...values, pageId, parentId };
		postComments(comment);
	};
	return (
		<motion.div
			className={
				isReply
					? 'p-6 rounded-xl shadow-gray-500/60 shadow-inner ring-1 ring-gray-500 mt-4 relative'
					: 'mt-5'
			}
			initial={
				isReply ? { opacity: 0, scale: 0, transformOrigin: 'top right' } : { opacity: 1, scale: 1 }
			}
			animate={isReply ? { opacity: 1, scale: 1 } : false}
			exit={{
				opacity: 0,
				scale: 0,
				transformOrigin: 'top right',
				height: 0,
				padding: 0,
				margin: 0,
			}}
		>
			<div>
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
									<FormControl>
										<TextArea
											{...field}
											replyUser={parentUser}
											placeholder="友善评论哦"
											required
											maxLength={500}
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
		</motion.div>
	);
}

export default CommentForm;
