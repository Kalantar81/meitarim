package com.max.amazon.s3;

//snippet-start:[presigned.java2.generatepresignedurl.import]
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.Duration;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
//snippet-end:[presigned.java2.generatepresignedurl.import]

public class GeneratePresignedUrlAndUploadObject {

 public static void main(String[] args)
 {
     if (args.length < 2) {
         System.out.println("Please specify a bucket name and a key name");
         System.exit(1);
     }

     // snippet-start:[presigned.java2.generatepresignedurl.main]
     String bucketName = args[0];
     String keyName = args[1];

     // Create an S3Presigner using the default region and credentials.
     // This is usually done at application startup, because creating a presigner can be expensive.
     S3Presigner presigner = S3Presigner.create();

     try{
         // PutObjectPresignRequest.Builder

        PresignedPutObjectRequest presignedRequest =
                 presigner.presignPutObject(z -> z.signatureDuration(Duration.ofMinutes(10))
                         .putObjectRequest(por -> por.bucket(bucketName).key(keyName)));

         System.out.println("Pre-signed URL to upload a file to: " +
                 presignedRequest.url());
         System.out.println("Which HTTP method needs to be used when uploading a file: " +
                 presignedRequest.httpRequest().method());


         //Upload content to the bucket using this URL
         URL url = presignedRequest.url();

         // Create the connection and use it to upload the new object using the pre-signed URL.
         HttpURLConnection connection = (HttpURLConnection) url.openConnection();
         connection.setDoOutput(true);
         connection.setRequestProperty("Content-Type","text/plain");
         connection.setRequestMethod("PUT");
         OutputStreamWriter out = new OutputStreamWriter(connection.getOutputStream());
         out.write("This text uploaded as an object via presigned URL.");
         out.close();

         connection.getResponseCode();
         System.out.println("HTTP response code: " + connection.getResponseCode());

         // It is recommended to close the S3Presigner when it is done being used, because some credential
         // providers (e.g. if your AWS profile is configured to assume an STS role) require system resources
         // that need to be freed. If you are using one S3Presigner per application (as recommended), this
         // usually is not needed.
         presigner.close();

     }
     catch (Exception e)
     {
         e.getStackTrace();
     }
     // snippet-end:[presigned.java2.generatepresignedurl.main]
 }
}