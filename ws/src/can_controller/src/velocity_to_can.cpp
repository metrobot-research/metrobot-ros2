#include <cstdio>
#include <chrono>
#include <functional>
#include <memory>
#include <string>
#include <tuple>

#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/string.hpp"

using namespace std::chrono_literals;

class PathfinderSubscriber : public rclcpp::Node
{
  public:
    PathfinderSubscriber()
    : Node("minimal_subscriber")
    {
      subscription_ = this->create_subscription<tuple>("PLACEHOLDER_VELOCITY_TOPIC", 10, std::bind(&PathfinderSubscriber::topic_callback, this, _1));
    }

  private:
    void topic_callback(const tuple::SharedPtr msg) const
    {
      double left_vel = get<0>msg;
      double right_vel = get<1>msg;
    }
    rclcpp::Subscription<std_msgs::msg::String>::SharedPtr subscription_;
};

int main(int argc, char ** argv)
{
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<MinimalSubscriber>());
  rclcpp::shutdown();
  return 0;
}
