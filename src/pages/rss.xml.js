import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import dayjs from 'dayjs';

export function GET(context) {
	const postImportResult = import.meta.glob('./**/!(algorithm|febasic)/*.md', { eager: true });
	const posts = Object.values(postImportResult);
	return rss({
		title: 'luckycc',
		// `<description>` field in output xml
		description: "zqqcee's blog page",
		// Pull in your project "site" from the endpoint context
		// https://docs.astro.build/en/reference/api-reference/#contextsite
		site: context.site,
		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		items: posts.map((post) => ({
			link: post.url,
			content: sanitizeHtml(post.compiledContent()),
			title: post.frontmatter.title || '无标题',
			description: post.frontmatter.description || '',
			pubDate: post.frontmatter.date || dayjs().format('YYYY-MM-DD'),
		})),
		// (optional) inject custom xml
		customData: `
            <language>en-us</language>
            <follow_challenge>
                <feedId>79193578455209984</feedId>
                <userId>55616285853528064</userId>
            </follow_challenge>
            <image>
                <url>https://luckycc.cc/avatar.jpeg</url>
                <title>luckycc</title>
                <link>https://luckycc.cc/avatar.jpeg</link>
            </image>
        `,
		stylesheet: '/rss/styles.xsl',
	});
}
