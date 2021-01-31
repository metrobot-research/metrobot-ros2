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
