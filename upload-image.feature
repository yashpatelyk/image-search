Feature: Image uploading
  Scenario: Upload new image with success
    Given browser "Google Chrome"
    When I open "{environment.URL}"
    And I set "file description" value to "File description placeholder"
    And I click on "Choose File button"
    And I click on "image.jpg"
    And I press on “ENTER”
    And I click on "Submit image button"
    Then I should see text “Success” in “Response message placeholder”

  Scenario: Upload new image without success due to missing description
    Given browser "Google Chrome"
    When I open "{environment.URL}"
    And I click on "Choose File button"
    And I click on "image.jpg"
    And I press on “ENTER”
    And I click on "Submit image button"
    Then I should see text “Description Required” in “Response message placeholder”

  Scenario: Upload new image without success due to missing image
    Given browser "Google Chrome"
    When I open "{environment.URL}"
    And I set "file description" value to "File description placeholder"
    And I click on "Submit image button"
    Then I should see text “Image Required” in “Response message placeholder”

  Scenario: Upload new image without success due to unsupported type of image
    Given browser "Google Chrome"
    When I open "{environment.URL}"
    And I set "file description" value to "File description placeholder"
    And I click on "Choose File button"
    And I click on "image.gif"
    And I press on “ENTER”
    And I click on "Submit image button"
    Then I should see text “Only png/jpeg is supported” in “Response message placeholder”

  Scenario: Upload new image without success due to size of the image
    Given browser "Google Chrome"
    When I open "{environment.URL}"
    And I set "file description" value to "File description placeholder"
    And I click on "Choose File button"
    And I click on "large_image.png"
    And I press on “ENTER”
    And I click on "Submit image button"
    Then I should see text “Image should be less than 500 KB” in “Response message placeholder”

  Scenario: Initial page load
    Given browser "Google Chrome"
    When I open "{environment.URL}"
    Then existing records should be displayed
    And the application shows up to 20 records.

  Scenario: Search image with success
    Given browser "Google Chrome"
    When I open "{environment.URL}"
    And I set "file description" value to "File description filter placeholder"
    And I click on "Submit search"
    Then "search-results" should be displayed
    And "search-results" has 1 result.
    And I should see text “file description” in "search-results 1st row file description placeholder".
    And I should see the image description, image size, and image file type.

  Scenario: Search image with type
    Given browser "Google Chrome"
    When I open "{environment.URL}"
    And I select jpeg in image type dropdown
    And I click on "Submit search"
    Then "search-results" should be displayed
    And "search-results" has all the results which has jpeg as image type.
    And I should see the image description, image size, and image file type.

  Scenario: Search image with size
    Given browser "Google Chrome"
    When I open "{environment.URL}"
    And I set exact image size in size input
    And I click on "Submit search"
    Then "search-results" should be displayed
    And "search-results" has all the results which has entered size as image size
    And I should see the image description, image size, and image file type.
