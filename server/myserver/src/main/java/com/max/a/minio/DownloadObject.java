package com.max.a.minio;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.InvalidKeyException;

import org.xmlpull.v1.XmlPullParserException;

import io.minio.MinioClient;
import io.minio.errors.MinioException;

public class DownloadObject {
  /**
   * MinioClient.getObject() example.
   */
  public static void main(String[] args)
    throws IOException, NoSuchAlgorithmException, InvalidKeyException, XmlPullParserException {
    try {
      /* play.min.io for test and development. */
      MinioClient minioClient = new MinioClient("https://play.min.io", "Q3AM3UQ867SPQQA43P2F",
                                                "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG");

      /* Amazon S3: */
      // MinioClient minioClient = new MinioClient("https://s3.amazonaws.com", "YOUR-ACCESSKEYID",
      //                                           "YOUR-SECRETACCESSKEY");

      // Check whether the object exists using statObject().  If the object is not found,
      // statObject() throws an exception.  It means that the object exists when statObject()
      // execution is successful.
      minioClient.statObject("my-bucketname", "my-objectname");

      // Download 'my-objectname' from 'my-bucketname' to 'my-filename'
      minioClient.getObject("my-bucketname", "my-objectname", "my-filename");
      System.out.println("my-objectname is successfully downloaded to my-filename");
    } catch (MinioException e) {
      System.out.println("Error occurred: " + e);
    }
  }
}