
### Test Case #1
**Test Case Name**: User Registration  
**System**: DRX Website  
**Subsystem**: User Management  
**Designed by**:  
**Design Date**: 
**Executed by**:  
**Execution Date**:
**Short Description**: Testing user registration functionality.  

#### **Pre-conditions**:
- Website is running.
- Registration page is accessible.

| **Step** | **Action**                          | **Expected System Response**                                                                                     | **Pass/Fail** | **Comment** |
|----------|-------------------------------------|------------------------------------------------------------------------------------------------------------------|---------------|-------------|
| 1        | Navigate to the registration page. | Registration page loads successfully.                                                                            |               |             |
| 2        | Enter valid details and submit.    | User receives a confirmation message and is added to the database.                                               |               |             |
| 3        | Try submitting an incomplete form. | System displays an error message and prevents submission.                                                        |               |             |

#### **Post-conditions**:
- User is registered in the database.

---

### Test Case #2
**Test Case Name**: Login Functionality  
**System**: DRX Website  
**Subsystem**: User Management  
**Designed by**:  
**Design Date**: 
**Executed by**:  
**Execution Date**:
**Short Description**: Testing login functionality for registered users.

#### **Pre-conditions**:
- At least one user is registered.

| **Step** | **Action**                                  | **Expected System Response**                                           | **Pass/Fail** | **Comment** |
|----------|---------------------------------------------|------------------------------------------------------------------------|---------------|-------------|
| 1        | Enter correct credentials and log in.       | System logs the user in and redirects to the homepage.                 |               |             |
| 2        | Enter incorrect credentials and log in.     | System displays an error message: "Invalid credentials."               |               |             |
| 3        | Attempt to log in with an unregistered user.| System displays an error message: "User not found."                    |               |             |

#### **Post-conditions**:
- User is logged in for valid credentials.

---

### Test Case #3
**Test Case Name**: Real-Time Ball Tracking  
**System**: DRX Website  
**Subsystem**: Predictory Analysis
**Designed by**:  
**Design Date**: 
**Executed by**:  
**Execution Date**:
**Short Description**: Testing ball trajectory tracking during a live match.

#### **Pre-conditions**:
- Live match is being streamed.

| **Step** | **Action**                                      | **Expected System Response**                                            | **Pass/Fail** | **Comment** |
|----------|-------------------------------------------------|-------------------------------------------------------------------------|---------------|-------------|
| 1        | Begin live match tracking.                      | System detects the ball and starts displaying trajectory predictions.   |               |             |
| 2        | Test tracking for high-speed balls.             | System tracks the ball accurately without delay.                        |               |             |
| 3        | Test tracking under low-light conditions.       | System adjusts and continues tracking with minimal accuracy loss.       |               |             |

#### **Post-conditions**:
- Trajectory data is logged and displayed.

---

### Test Case #4
**Test Case Name**: Feedback Classification 
**System**: Deep Learning Model
**Subsystem**: Training model 
**Designed by**:  
**Design Date**: 
**Executed by**:  
**Execution Date**: 
**Short Description**: Testing positive/negative feedback classification.

#### **Pre-conditions**:
- Feedback module is enabled.

| **Step** | **Action**                              | **Expected System Response**                                             | **Pass/Fail** | **Comment** |
|----------|-----------------------------------------|--------------------------------------------------------------------------|---------------|-------------|
| 1        | Enter positive feedback (e.g., "Great!").| System classifies the feedback as "Positive."                           |               |             |
| 2        | Enter negative feedback (e.g., "Bad."). | System classifies the feedback as "Negative."                           |               |             |

#### **Post-conditions**:
- Feedback is correctly categorized.

---


### Test Case #5
**Test Case Name**: Player Performance Analytics  
**System**: DRX Website  
**Subsystem**: Analytics  
**Designed by**:  
**Design Date**:  
**Executed by**:  
**Execution Date**:  
**Short Description**: Testing the player performance analytics module.  

#### **Pre-conditions**:
- Player performance data is available in the database.  
- Analytics module is operational.

| **Step** | **Action**                                                  | **Expected System Response**                                                                 | **Pass/Fail** | **Comment** |
|----------|-------------------------------------------------------------|----------------------------------------------------------------------------------------------|---------------|-------------|
| 1        | Navigate to the player analytics page.                      | Player analytics page loads successfully with proper charts and stats.                      |               |             |
| 2        | Select a player to view detailed statistics.                | System displays detailed performance metrics, including average speed and accuracy.          |               |             |
| 3        | Compare performance of two players.                         | System generates a comparative analysis chart with clear metrics for both players.           |               |             |
| 4        | Export the performance data as a PDF.                       | System generates and downloads the PDF file without errors.                                  |               |             |

#### **Post-conditions**:
- Player performance data is accurately displayed and downloadable.

---

### Test Case #6
**Test Case Name**: AR Visualization  
**System**: DRX Website  
**Subsystem**: Augmented Reality  
**Designed by**:  
**Design Date**:  
**Executed by**:  
**Execution Date**: 
**Short Description**: Testing AR-based immersive 3D visualization for ball tracking.  

#### **Pre-conditions**:
- AR feature is enabled.  
- Device supports AR capabilities (e.g., compatible browsers or hardware).

| **Step** | **Action**                                               | **Expected System Response**                                                           | **Pass/Fail** | **Comment** |
|----------|----------------------------------------------------------|----------------------------------------------------------------------------------------|---------------|-------------|
| 1        | Activate AR visualization for a match.                   | System renders a 3D view of the ball's trajectory and player movements in real time.   |               |             |
| 2        | Test pinch-and-zoom gesture to adjust the view.           | System responds smoothly, allowing zooming in and out of the 3D space.                 |               |             |
| 3        | Rotate the 3D visualization to view different angles.     | System updates the view seamlessly based on user interaction.                          |               |             |

#### **Post-conditions**:
- AR visualization works without lag and responds to user input effectively.

---

### Test Case #7
**Test Case Name**: Database Backup  
**System**: DRX Website  
**Subsystem**: Data Management  
**Designed by**:  
**Design Date**:  
**Executed by**:  
**Execution Date**: 
**Short Description**: Testing backup functionality for critical data.  

#### **Pre-conditions**:
- Database contains player and match data.  
- Backup module is enabled.

| **Step** | **Action**                                | **Expected System Response**                                                | **Pass/Fail** | **Comment** |
|----------|-------------------------------------------|-----------------------------------------------------------------------------|---------------|-------------|
| 1        | Initiate a database backup process.       | System generates a backup file and saves it in the designated location.     |               |             |
| 2        | Check if the backup file is accessible.   | Backup file is accessible and matches the expected structure.               |               |             |
| 3        | Restore the database from the backup.     | System successfully restores the database to the state at the time of backup.|               |             |

#### **Post-conditions**:
- Backup and restore processes are completed successfully.

---

### Test Case #8
**Test Case Name**: Data Privacy and Permissions  
**System**: DRX Website  
**Subsystem**: Security  
**Designed by**:  
**Design Date**:  
**Executed by**:  
**Execution Date**: 
**Short Description**: Verifying data privacy controls and access permissions.  

#### **Pre-conditions**:
- Different user roles (e.g., admin, player, viewer) are defined.  
- Sensitive data is present in the database.

| **Step** | **Action**                                | **Expected System Response**                                                | **Pass/Fail** | **Comment** |
|----------|-------------------------------------------|-----------------------------------------------------------------------------|---------------|-------------|
| 1        | Log in as an admin and access sensitive data. | Admin can access sensitive data without restrictions.                       |               |             |
| 2        | Log in as a player and attempt to access admin-only data. | System denies access and displays a permission error.                       |               |             |
| 3        | Check if data is encrypted in transit.    | System ensures that all data is transmitted securely using HTTPS.           |               |             |

#### **Post-conditions**:
- Data privacy and permission settings work as intended.

---

### Test Case #9
**Test Case Name**: Leaderboard Functionality  
**System**: DRX Website  
**Subsystem**: Analytics  
**Designed by**:  
**Design Date**:  
**Executed by**:  
**Execution Date**: 
**Short Description**: Testing the leaderboard for top-performing players.  

#### **Pre-conditions**:
- Player performance data is available.  
- Leaderboard module is enabled.

| **Step** | **Action**                                           | **Expected System Response**                                                            | **Pass/Fail** | **Comment** |
|----------|------------------------------------------------------|-----------------------------------------------------------------------------------------|---------------|-------------|
| 1        | Navigate to the leaderboard page.                    | Leaderboard displays top players based on their performance metrics.                    |               |             |
| 2        | Filter leaderboard by specific criteria (e.g., match).| System updates the leaderboard based on the selected filter.                            |               |             |
| 3        | Check if rankings update after a new match.          | System recalculates rankings and updates the leaderboard accurately.                    |               |             |

#### **Post-conditions**:
- Leaderboard accurately reflects player rankings.

---

### Test Case #10
**Test Case Name**: Mobile Responsiveness  
**System**: DRX Website  
**Subsystem**: UI/UX  
**Designed by**:  
**Design Date**:  
**Executed by**:  
**Execution Date**: 
**Short Description**: Testing the website's responsiveness on mobile devices.  

#### **Pre-conditions**:
- Website is operational.  
- Different devices (e.g., smartphones, tablets) are available for testing.

| **Step** | **Action**                              | **Expected System Response**                                                | **Pass/Fail** | **Comment** |
|----------|-----------------------------------------|-----------------------------------------------------------------------------|---------------|-------------|
| 1        | Open the website on a smartphone browser. | Website adapts to the screen size and is fully functional.                   |               |             |
| 2        | Test navigation menu and buttons.       | Navigation menu and buttons respond correctly on mobile devices.             |               |             |
| 3        | Check the layout on a tablet.           | Website layout adjusts seamlessly to the larger screen size.                 |               |             |

#### **Post-conditions**:
- Website is mobile-friendly and fully responsive.

---
