using System;
using System.Diagnostics;
using System.Net.Http;
using System.Threading.Tasks;
using VersOne.Epub;
namespace LovBooks;


public partial class Livres : ContentPage
{
    // URL de la route
    private string Url = "http://10.0.2.2:3000/api/epub/1";
    // Permet d'utiliser les requêtes HTTP
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
            // Récupère le fichier epub blob
            var response = await client.GetAsync(endpoint.Text);
            
            if (response.IsSuccessStatusCode)
            {
                var content = response.Content;

                // Charge le fichier EPUB 
                EpubBook epubBook = EpubReader.ReadBook(content.ReadAsStream());

                Debug.WriteLine(response);
                // Recupère le titre
                string bookTitle = epubBook.Title;

                // Affichage du titre
                titleLabel.Text = bookTitle;
            }
            else
            {
                await DisplayAlert("Erreur", "Impossible de récupérer le fichier EPUB", "OK");
            }
        }
        catch (Exception ex)
        {
            await DisplayAlert("Erreur", $"Une erreur s'est produite : {ex.Message}", "OK");
        }
    }
}


