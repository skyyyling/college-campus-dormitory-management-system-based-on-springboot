package com.lingzhix.mapper;

import com.lingzhix.entity.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapper {

	public int create(User user);

	public int delete(Integer id);

	public int update(User user);

	public int updateSelective(User user);

	public List<User> query(User user);

	public User detail(Integer id);

	public User login(@Param("userName") String userName,@Param("password") String password);

	public int count(User user);

}