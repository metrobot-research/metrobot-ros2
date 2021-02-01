# metrobot_ros

This GitHub repo contains all of the MetroBot-specific ROS Packages.

To use:
1. Install ROS2 Foxy.
2. Create a `~/ros_ws/` folder.
3. Inside your workspaces folder, create `metrobot_ws` folder.
4. Inside the MetroBot workspace, clone this repo.
5. *IMPORTANT:* Rename the repo to `src`. Without this rename operation, catkin commands will not work.
6. From the MetroBot workspace, run `catkin_make` and ensure there are no errors.
7. *IMPORTANT:* In EVERY terminal window from which you want to run MetroBot-related items, you MUST run this command: `source ~/ros_ws/metrobot_ws/devel.setup.bash`

## Package Convention
- metrobot
    - This is the 'meta' package. Its purpose is simply to include a dependency on every other MetroBot package, so that installing this single meta package installs everything a new user would need.
- metrobot_msgs
    - All custom interface types (including messages, services, actions) should be contained here. This ensures easy cross-talk across packages that need to use these messages.
- metrobot_bringup
    - All launch files, etc. for starting up the robot system (whether on real hardware or in simulation) should be contained here for ease of use.
- metrobot_hardware
    - All code that directly interfaces with hardware in a non-ROS way (ex: CAN bus communication for motor controllers) should be contained here.
- metrobot_control
    - All custom control algorithms, etc. should be included here. Note that off-the-shelf control packages may supplant the need for this package.
- metrobot_description
    - All URDF files for use in rviz simulation should be contained here.
