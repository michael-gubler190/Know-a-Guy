package gubler.know_a_guy.know_a_guy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class KnowAGuyApplication {

	public static void main(String[] args) {
		SpringApplication.run(KnowAGuyApplication.class, args);
	}

}
