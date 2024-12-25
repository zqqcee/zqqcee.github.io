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
import { useToast } from '@/hooks/use-toast';

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
	pageTitle?: string;
}
function CommentForm(props: IProps) {
	const { isReply, pageId, parentId, parentUser, setReplyVisible, pageTitle } = props;
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	const [loading, setLoading] = React.useState<boolean>(false);
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const comment = { ...values, pageId, parentId, pageTitle };
		setLoading(true);
		postComments(comment)
			.then(() => {
				toast({
					title: `✅ Hello ${values.username}，谢谢你的评论！`,
					description: '在通过审核后，它会出现在这篇文章的下方',
					className: 'bg-gray-700 text-white border border-gray-500',
					duration: 5000,
				});
			})
			.catch(() => {
				toast({
					title: `😢 抱歉，出了一些问题`,
					description: '重新发送一下试试看',
					className: 'bg-gray-800 text-rose-300 border border-gray-500',
					duration: 5000,
				});
			})
			.finally(() => {
				form.reset({ email: '', url: '', username: '', text: '' });
				setReplyVisible?.(false);
				setLoading(false);
			});
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
					<form className="space-y-4" autoComplete={'off'}>
						<div className="flex gap-4 justify-stretch">
							<FormInputItem name="username" placeholder={'你的名称'} form={form} required />
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
											placeholder={'说点什么吧'}
											required
											onSubmit={form.handleSubmit(onSubmit)}
											loading={loading}
											maxLength={500}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
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
