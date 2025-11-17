import com.noxa.backend.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendConfirmation(Order order) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("noreply@noxa.com"); // TODO: Replace with actual sender email
            helper.setTo(order.getUser().getEmail());
            helper.setSubject("Order Confirmation - NOXA #" + order.getOrderNumber());
            helper.setText(buildEmailContent(order), true);

            mailSender.send(message);
            System.out.println("Confirmation email sent for order: " + order.getOrderNumber());
        } catch (MessagingException e) {
            System.err.println("Failed to send confirmation email for order: " + order.getOrderNumber() + ": " + e.getMessage());
            // TODO: Log the exception properly
        }
    }

    private String buildEmailContent(Order order) {
        StringBuilder content = new StringBuilder();
        content.append("<h1>Order Confirmation</h1>");
        content.append("<p>Dear ").append(order.getUser().getFullName()).append(",</p>");
        content.append("<p>Thank you for your order! Your order number is <strong>").append(order.getOrderNumber()).append("</strong>.</p>");
        content.append("<h2>Order Details:</h2>");
        content.append("<ul>");
        order.getItems().forEach(item -> {
            content.append("<li>").append(item.getMenuItem().getName()).append(" x ").append(item.getQuantity()).append(" - $").append(String.format("%.2f", item.getUnitPrice() * item.getQuantity())).append("</li>");
        });
        content.append("</ul>");
        content.append("<p><strong>Total: $").append(String.format("%.2f", order.getTotal())).append("</strong></p>");
        content.append("<h2>Delivery Address:</h2>");
        content.append("<p>").append(order.getStreet()).append(", ").append(order.getAptSuite()).append("</p>");
        content.append("<p>").append(order.getCity()).append(", ").append(order.getZip()).append("</p>");
        if (order.getSpecialInstructions() != null && !order.getSpecialInstructions().isEmpty()) {
            content.append("<p><strong>Special Instructions:</strong> ").append(order.getSpecialInstructions()).append("</p>");
        }
        content.append("<p>We will notify you once your order is on its way.</p>");
        content.append("<p>Sincerely,<br/>The NOXA Team</p>");
        return content.toString();
    }
}