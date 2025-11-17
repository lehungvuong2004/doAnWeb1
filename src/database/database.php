<?php
class connect
{  
    private $host = "localhost";
    private $db = "nhahang";
    private $user = "root";
    private $pwd = "";  
    public $conn = null;
    private $result = null;

    // kết nối
    function connect()
    {
        if ($this->conn === null) {
            $this->conn = new mysqli($this->host, $this->user, $this->pwd, $this->db);
            if ($this->conn->connect_error) {
                die("Kết nối DB thất bại: " . $this->conn->connect_error);
            }
            $this->conn->set_charset("utf8");
        }
        return $this->conn;
    }
    public function select($sql)
    {
        $this->connect();
        $this->result = $this->conn->query($sql);
        return $this->result;
    }

    // fetch one dòng
    public function fetch()
    {
        if ($this->result && $this->result->num_rows > 0) {
            return $this->result->fetch_assoc();
        } else {
            return null;
        }
    }
    // thực thi insert update 
    function command($sql)
    {
        $this->connect();
        $result = $this->conn->query($sql);
        return $result;
    }

    // expose mysqli để dùng prepared statement nếu cần
    public function getMysqli()
    {
        return $this->connect();
    }
}
?>
