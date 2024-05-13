using System;
using System.IO;
using System.Diagnostics;
using System.Net.Http;
using System.Threading.Tasks;
using VersOne.Epub;
using System.IO.Compression;

namespace LovBooks
{
    public partial class Livres : ContentPage
    {
        // URL de la route
        private string Url = "http://10.0.2.2:3000/api/epub/1";
        // Permet d'utiliser les requ�tes HTTP
        HttpClient client = new();

        public Livres()
        {
            InitializeComponent();
        }

        // Chargement des epubs
        private async void LoadingEpub(object sender, EventArgs e)
        {
            try
            {
                for (int i = 1; i <= 6; i++)
                {
                    // R�cup�re le fichier epub blob
                    var response = await client.GetAsync($"http://10.0.2.2:3000/api/epub/{i}");

                    if (response.IsSuccessStatusCode)
                    {
                        var content = response.Content;

                        // Charge le fichier EPUB 
                        EpubBook epubBook = EpubReader.ReadBook(content.ReadAsStream());

                        // R�cup�re l'image de couverture
                        var coverImage = epubBook.CoverImage;

                        if (coverImage != null)
                        {
                            // Convertit les donn�es d'image en image affichable
                            var imageStream = new MemoryStream(coverImage);

                            // Cr�e une image avec les donn�es de l'image
                            Image imageControl = new Image();
                            imageControl.Source = ImageSource.FromStream(() => imageStream);

                            // Affiche l'image dans votre interface utilisateur
                            contentStackLayout.Children.Add(imageControl);
                        }

                        // Affichage du titre 
                        string bookTitle = epubBook.Title;
                        titleLabel.Text += bookTitle + Environment.NewLine;
                    }
                    else
                    {
                        await DisplayAlert("Erreur", "Impossible de r�cup�rer le fichier EPUB", "OK");
                    }
                }
            }
            catch (Exception ex)
            {
                await DisplayAlert("Erreur", $"Une erreur s'est produite : {ex.Message}", "OK");
            }
        }
    }
}
