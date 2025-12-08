import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AppDispatch, RootState } from "@/store";
import { bookmarkCheck } from "@/store/user/userSlice";
import type { USERI } from "@/types/Index";
import { Avatar } from "@radix-ui/react-avatar";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
  // const itemsPerPage = 10;
  // const [itemOffset, setItemOffset] = useState(0);
  const { data } = useSelector((s: RootState) => s.user);
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState<string>("");
  // const [filterData, setFilterData] = useState<USERI[]>(data);

  const handleBookMarkCheck = (arg: USERI) => {
    dispatch(bookmarkCheck(arg));
  };

  // const endOffset = itemOffset + itemsPerPage;

  // const currentItems = data.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(data.length / itemsPerPage);

  // const handlePageClick = (event: number) => {
  //   const newOffset = (event * itemsPerPage) % data.length;
  //   setItemOffset(newOffset);
  // };

  const handleSearch = (event: any) => {
    setTimeout(() => {
      setSearch(event.target.value);
    }, 500);
  };

  // useEffect(() => {
  //   if (search) {
  //     const res: USERI[] = data?.filter((item) => item?.login === search);
  //     console.log("filterDatafilterDatafilterData", filterData);
  //     setFilterData(res);
  //   } else {
  //     setFilterData(data);
  //   }
  // }, [search]);

  return (
    <div className="min-h-screen w-full px-10 py-10">
      <div className="mt-2 mb-5">
        <Input placeholder="Type here..." onChange={(e) => handleSearch(e)} />
      </div>
      <Table>
        <TableHeader className="bg-gray-100">
          <TableCell>ID</TableCell>
          <TableCell>Avatar</TableCell>
          <TableCell>Login</TableCell>
          <TableCell>User View Type</TableCell>
          <TableCell>Action</TableCell>
        </TableHeader>
        <TableBody>
          {data?.filter((fu) => !fu?.is_book_mark)?.length > 0 ? (
            <>
              {data
                ?.filter((fu) => !fu?.is_book_mark)
                .map((u, idx) => (
                  <TableRow key={`${u.id}-${idx}`}>
                    <TableCell>{u?.id}</TableCell>
                    <TableCell>
                      <Avatar>
                        <AvatarImage
                          src={u.avatar_url}
                          alt={u.login}
                          className="w-10 h-10 rounded-full"
                        />
                        <AvatarFallback>{u.login}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{u?.login}</TableCell>
                    <TableCell>
                      <Badge className="capitalize">{u.user_view_type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant={"outline"}
                        size={"icon"}
                        onClick={() => handleBookMarkCheck(u)}
                      >
                        <Bookmark />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </>
          ) : (
            <TableRow>
              <TableCell className="text-center py-5" colSpan={5}>
                No User Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <div className="w-full px-10 mt-10">
        <Pagination className="w-full flex justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              {[...Array(pageCount)].map((_, idx) => (
                <PaginationLink
                  onClick={() => handlePageClick(idx + 1)}
                  href="#"
                >
                  {idx + 1}
                </PaginationLink>
              ))}
            </PaginationItem>
            <PaginationItem onClick={() => handlePageClick(2)}>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div> */}
    </div>
  );
};

export default Index;
