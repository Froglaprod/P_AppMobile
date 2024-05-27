namespace LovBooks;

public partial class BookDetails : ContentPage
{
	

    public BookDetails(string title, ImageSource coverImageSource, string bookContent)
    {
        InitializeComponent();

        bookTitleLabel.Text = title;
        coverImage.Source = coverImageSource;
        bookContentLabel.Text = bookContent;
    }
}