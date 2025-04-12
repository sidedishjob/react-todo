import { z } from 'zod';

// Todoのタイトルのバリデーション
export const todoTitleSchema = z
	.string()
	.max(100, 'タイトルは100文字以内で入力してください')
	.refine((val) => val.trim().length > 0, {
		message: 'タイトルは空白以外の文字で入力してください',
	});

export const todoFormSchema = z.object({
	title: todoTitleSchema,
});
