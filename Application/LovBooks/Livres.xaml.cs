using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using VersOne.Epub;


namespace LovBooks
{
    public partial class Livres : ContentPage
    {
        // URL de la route
        private string Url = "http://10.0.2.2:3000/api/epub/1";
        // Permet d'utiliser les requêtes HTTP
        HttpClient client = new HttpClient();

        public Livres()
        {
            InitializeComponent();
        }

        // Chargement des epubs
        public async void LoadingEpub(object sender, EventArgs e)
        {
            try
            {
                for (int i = 1; i <= 6; i++)
                {
                    //Récupère le fichier epub blob
                    var response = await client.GetAsync($"http://10.0.2.2:3000/api/epub/{i}");

                    if (response.IsSuccessStatusCode)
                    {
                        var content = response.Content;

                        //Charge le fichier EPUB 
                        EpubBook epubBook = EpubReader.ReadBook(await content.ReadAsStreamAsync());

                       
                        var bookLayout = new StackLayout
                        {
                            Orientation = StackOrientation.Vertical,
                            Margin = new Thickness(10)
                        };

                        // Affichage du titre 
                        string bookTitle = epubBook.Title;

                        // Affichage de la description
                        string description = epubBook.Author;

                        Label titleLabel = new Label
                        {
                            Text = bookTitle,
                            HorizontalOptions = LayoutOptions.Center
                        };
                        bookLayout.Children.Add(titleLabel);

                        Label descriptionLabel = new Label
                        {
                            Text = description,
                            HorizontalOptions = LayoutOptions.Center
                        };
                        bookLayout.Children.Add(descriptionLabel);

                        //Récupère l'image 
                        var coverImage = epubBook.CoverImage;
                        if (coverImage != null)
                        {
                            var imageStream = new MemoryStream(coverImage);
                            Image imageControl = new Image
                            {
                                Source = ImageSource.FromStream(() => imageStream),
                                HeightRequest = 200,
                                WidthRequest = 150,
                                Aspect = Aspect.AspectFit
                            };
                            bookLayout.Children.Add(imageControl);
                        }

                       
                        Button readButton = new Button
                        {
                            Text = "Lire",
                            Command = new Command(() => OpenBookDetailPage(bookTitle, ImageSource.FromStream(() => new MemoryStream(coverImage)), description))
                        };
                        bookLayout.Children.Add(readButton);

                        
                        contentStackLayout.Children.Add(bookLayout);
                    }
                    else
                    {
                        await DisplayAlert("Erreur", "Impossible de récupérer le fichier EPUB", "OK");
                    }
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erreur", $"Une erreur s'est produite : {ex.Message}", "OK");
            }
        }

        private async void OpenBookDetailPage(string title, ImageSource coverImageSource, string description)
        {
            await Navigation.PushAsync(new BookDetails(title, coverImageSource, description));
        }
    }
}
