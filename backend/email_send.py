from pretty_html_table import build_table
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib, ssl
import email_template
import email_helper

def email_send(details, order_id, email, name, address, state, postcode, phone):
    ''' Sends email with order details of their purchase to user '''
    # Set up details
    port = 465
    smtp_server = "smtp.gmail.com"
    msg = MIMEMultipart("alternative", None)
    msg["Subject"] = f"CookBook - Your order {order_id} has been confirmed"
    msg["From"] = "cookbook.services@gmail.com"
    msg["To"] = email

    # Email message body template
    body = email_template.template
    total, n_items, df_ingredients = email_helper.email_order_details(details)  
    total = "{:.2f}".format(total)     
    html_table = build_table(df_ingredients, 
                             'grey_light', 
                             font_size=16, 
                             font_family='Open Sans, sans-serif', 
                             index=False)
    
    # Update details of email body
    body = body.replace("{table}", str(html_table))
    body = body.replace("{name}", name)
    body = body.replace("{order_id}", order_id)
    body = body.replace("{items_qty}", str(n_items))
    body = body.replace("{total}", total)
    body = body.replace("{address}", address)
    body = body.replace("{state}", state)
    body = body.replace("{postcode}", postcode)
    body = body.replace("{phone}", phone)
    body = MIMEText(body, 'html')
    msg.attach(body)

    # Connects to server and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(msg["From"], "CookBook!")
        server.sendmail(msg["From"], msg["To"], msg.as_string())
    