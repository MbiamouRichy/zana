export function EmailTemplate({ url, email }: { url: string; email: string }) {
  return `
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vérification Email</title>
  </head>

  <body style="margin:0; padding:0; background:#ffffff; font-family: Arial, sans-serif; color:#000000;">
    
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff; padding:40px 0;">
      <tr>
        <td align="center">
          
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:500px; background:#ffffff; padding:30px; border:1px solid #e5e7eb; border-radius:8px;">
            
            <!-- Logo -->
            <tr>
              <td style="padding-bottom:20px;">
                <a href="https://ton-site.com" target="_blank">
                  <img 
                    src="https://ton-site.com/logo.png" 
                    alt="Logo"
                    width="120"
                    style="display:block; border:0;"
                  />
                </a>
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td style="font-size:22px; font-weight:bold; padding-bottom:20px;">
                Vérification de votre email
              </td>
            </tr>

            <!-- Greeting -->
            <tr>
              <td style="padding-bottom:15px;">
                Salut 👋,
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding-bottom:15px;">
                Merci de t'être inscrit avec <strong>${email}</strong>.
              </td>
            </tr>

            <tr>
              <td style="padding-bottom:20px;">
                Clique sur le bouton ci-dessous pour valider ton email :
              </td>
            </tr>

            <!-- Button (LEFT aligned) -->
            <tr>
              <td style="padding:20px 0;">
                <a 
                  href="${url}"
                  style="
                    display:inline-block;
                    padding:12px 24px;
                    background:#000000;
                    color:#ffffff;
                    text-decoration:none;
                    border-radius:6px;
                    font-weight:bold;
                  "
                >
                  Confirmer mon email
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding-top:20px; font-size:13px; color:#6b7280;">
                Si tu n'es pas à l'origine de cette inscription, tu peux ignorer cet email.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
</html>
  `;
}
