class Article{
    constructor(
        ArticleID,
        Title,
        HeaderImage,
        Content,
        PublishDate,
        AuthorID,
        ArticleCategoryID,
        
    ) {
        this.ArticleID = ArticleID;
        this.Title = Title;
        this.HeaderImage = HeaderImage;
        this.Content = Content;
        this.PublishDate = PublishDate;
        this.AuthorID = AuthorID;
        this.ArticleCategoryID = ArticleCategoryID;
    }
}
module.exports = Article;